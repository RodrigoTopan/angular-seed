import { FeedsModule } from './feed.module';

describe('FeedsModule', () => {
  let eventsModule: FeedsModule;

  beforeEach(() => {
    eventsModule = new FeedsModule();
  });

  it('should create an instance', () => {
    expect(eventsModule).toBeTruthy();
  });
});
