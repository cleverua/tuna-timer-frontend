import { NgReduxProtoPage } from './app.po';

describe('tuna-timer App', function() {
  let page: NgReduxProtoPage;

  beforeEach(() => {
    page = new NgReduxProtoPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
