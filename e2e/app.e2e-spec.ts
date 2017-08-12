import { AngularFbAppPage } from './app.po';

describe('angular-fb-app App', () => {
  let page: AngularFbAppPage;

  beforeEach(() => {
    page = new AngularFbAppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
