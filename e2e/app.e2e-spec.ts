import { ZooPage } from './app.po';

describe('zoo App', () => {
  let page: ZooPage;

  beforeEach(() => {
    page = new ZooPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
