import { ActivitiesModule } from './activity.module';

describe('ActivitiesModule', () => {
  let activitiesModule: ActivitiesModule;

  beforeEach(() => {
    activitiesModule = new ActivitiesModule();
  });

  it('should create an instance', () => {
    expect(activitiesModule).toBeTruthy();
  });
});
