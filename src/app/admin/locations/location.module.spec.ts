import { LocationsModule } from './location.module';

describe('LocationsModule', () => {
  let eventsModule: LocationsModule;

  beforeEach(() => {
    eventsModule = new LocationsModule();
  });

  it('should create an instance', () => {
    expect(eventsModule).toBeTruthy();
  });
});
