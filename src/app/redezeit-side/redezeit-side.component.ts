import { Component, Input } from '@angular/core';
import {
  BehaviorSubject,
  combineLatest,
  filter,
  map,
  pairwise,
  Subject,
} from 'rxjs';
import { RedezeitSpeaker } from '../models/redezeit-type';
import { RedezeitType } from '../_enums/redezeit-type.enum';
import { GlobalStateService } from '../_services/global-state.service';

const toSeconds = map(([timeCisM, second]) =>
  Math.floor((second - timeCisM) / 1000)
);

const filterBelowZero = map((sec: number) => Math.max(0, sec));

const secondsToFormat = map((seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const secondsremainder = seconds % 60;
  return `${minutes} min ${secondsremainder} sec`;
});

const removeRunning = map<[number, number, any], [number, number]>(
  ([_0, _1, _2]) => [_0, _1]
);

@Component({
  selector: 'app-redezeit-side',
  templateUrl: './redezeit-side.component.html',
  styleUrls: ['./redezeit-side.component.scss'],
})
export class RedezeitSideComponent {
  @Input() type: RedezeitSpeaker = RedezeitSpeaker.CISM;

  startTime$ = new BehaviorSubject<number>(0);
  everySecond$ = new Subject<number>();

  timeInSeconds$ = combineLatest([
    this.startTime$,
    this.everySecond$,
    this.globaleState.state$,
  ]).pipe(
    filter(([_0, _1, state]) => state === this.type),
    removeRunning,
    toSeconds,
    filterBelowZero
  );

  timeHumanReadable$ = this.timeInSeconds$.pipe(secondsToFormat);

  redezeitenForType$ = this.globaleState.redezeiten.pipe(
    map((redezeiten) =>
      redezeiten.filter((redezeit) => redezeit.speaker == this.type)
    )
  );

  get running$() {
    return this.globaleState.state$.pipe(
      map((state) => this.type === state && state !== RedezeitSpeaker.PAUSE)
    );
  }

  get title() {
    switch (this.type) {
      case RedezeitSpeaker.CISM:
        return 'Cis Mänlich';
      case RedezeitSpeaker.FLINTA:
        return 'FLINTA*';
      case RedezeitSpeaker.PAUSE:
        return 'Pause';
      default:
        return 'Ey Software Fehler';
    }
  }

  constructor(public readonly globaleState: GlobalStateService) {
    setInterval(() => {
      this.everySecond$.next(Date.now());
    }, 1);

    combineLatest([
      this.globaleState.state$.pipe(pairwise()),
      this.timeInSeconds$,
    ])
      .pipe(
        filter(
          ([[speakerType, _], _a]) => speakerType !== RedezeitSpeaker.PAUSE
        ),
        filter(
          ([[old_state, new_state], _]) =>
            old_state === this.type && new_state !== this.type
        )
      )
      .subscribe(([_, seconds]) => {
        this.globaleState.redezeiten.next([
          ...this.globaleState.redezeiten.value,
          {
            duration: seconds,
            speaker: this.type,
            date: new Date(),
            id: crypto.randomUUID(),
            type: RedezeitType.Beitrag, // TODO
          },
        ]);
      });
  }

  public startTimer() {
    this.startTime$.next(Date.now());
    this.globaleState.state$.next(this.type);
  }
}
