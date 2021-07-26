import { catchError, Observable, of } from 'rxjs';

export function handleObservable<T>(obs: Observable<T>): Promise<T> {
  return new Promise((res, rej) => {
    obs
      .pipe(
        catchError((data: T) =>
          of({
            ...data,
            error: true,
          }),
        ),
      )
      .subscribe((data: T & { error?: boolean }) => {
        if (data.error) {
          rej(data);
        }
        res(data);
      });
  });
}
