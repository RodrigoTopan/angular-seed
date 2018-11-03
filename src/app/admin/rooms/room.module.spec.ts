import { RoomsModule } from './room.module';

describe('RoomsModule', () => {
  let eventsModule: RoomsModule;

  beforeEach(() => {
    eventsModule = new RoomsModule();
  });

  it('should create an instance', () => {
    expect(eventsModule).toBeTruthy();
  });
});
