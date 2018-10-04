import { EventsModule } from './event.module';

describe('EventsModule', () => {
  let eventsModule: EventsModule;

  beforeEach(() => {
    eventsModule = new EventsModule();
  });

  it('should create an instance', () => {
    expect(eventsModule).toBeTruthy();
  });
});
