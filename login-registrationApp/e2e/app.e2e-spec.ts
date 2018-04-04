import { LoginRegistrationAppPage } from './app.po';

describe('login-registration-app App', function() {
  let page: LoginRegistrationAppPage;

  beforeEach(() => {
    page = new LoginRegistrationAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
