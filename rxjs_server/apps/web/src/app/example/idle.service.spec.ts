import { TestBed, fakeAsync, tick } from '@angular/core/testing';

import { IdleService } from './idle.service';

fdescribe('IdleService', () => {
  let service: IdleService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({});
    service = TestBed.get(IdleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('countdown should be zero by default', fakeAsync(() => {
    expect(service.countdown).toBe(0);
  }));
  it('countdown should be null after tick', fakeAsync(() => {
    service.tick();
    expect(service.countdown).toBe(null);
    service.destroy();
  }));
  it('countdown should be 3 sec after 3000ms', fakeAsync(() => {
    service.tick();
    tick(2999);
    expect(service.countdown).toBe(null);
    tick(1);
    expect(service.countdown).toBe(3);
    tick(1000);
    expect(service.countdown).toBe(2);
    service.destroy();
  }));
  it('countdown should be 0 sec after 6000ms', fakeAsync(() => {
    service.tick();
    let c = null;
    service.countdown$.subscribe(count => (c = count));
    tick(3000);
    expect(c).toBe(3);
    tick(3000);
    expect(c).toBe(0);
    service.destroy();
  }));
  it('tick() method should reset the timer', fakeAsync(() => {
    service.tick();
    tick(4000);
    expect(service.countdown).toBe(2);
    service.tick();
    tick(5000);
    expect(service.countdown).toBe(1);
    service.destroy();
  }));
});
