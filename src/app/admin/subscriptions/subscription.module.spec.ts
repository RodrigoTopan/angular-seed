import { SubscriptionsModule } from './subscription.module';

describe('SubscriptionsModule', () => {
  let subscriptionsModule: SubscriptionsModule;

  beforeEach(() => {
    subscriptionsModule = new SubscriptionsModule();
  });

  it('should create an instance', () => {
    expect(subscriptionsModule).toBeTruthy();
  });
});
