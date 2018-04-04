import { WishBonesAppPage } from './app.po';

describe('wish-bones-app App', function() {
  let page: WishBonesAppPage;

  beforeEach(() => {
    page = new WishBonesAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
