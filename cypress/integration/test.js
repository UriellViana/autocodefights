const emailInput = ":nth-child(1) > .-layout > .input--wrapper > input";
const passwordInput = ":nth-child(2) > .-layout > .input--wrapper > input";
const loginButton = ".coder-login--button > .button > .button--content";

const zeroPad = str => `${str}`.padStart(2, "0");
const getDate = date =>
  [
    zeroPad(date.getFullYear()),
    zeroPad(date.getMonth() + 1),
    zeroPad(date.getDate())
  ].join("-");
const getTime = (date, minuteOffset = 0) =>
  [zeroPad(date.getHours()), zeroPad(date.getMinutes() + minuteOffset)].join(
    ":"
  );

function login(email, password) {
  cy.get(emailInput).type(email);
  cy.get(passwordInput).type(password);
  cy.get(loginButton).click();
}

describe("codefights", () => {
  beforeEach(() => {
    cy.visit("https://app.codesignal.com/login");
    login("__EMAIL__", "__PASSWORD__");
    // cy.visit("https://app.codesignal.com/tournaments");
  });

  it("should create a tournament", () => {
    cy.get(".-hide-s-gt > .-padding-h-16").click();
    cy.get(
      '[style="position: absolute; top: 0px; left: 0px; right: 0px; bottom: 0px; overflow: scroll; margin-right: -15px; margin-bottom: -15px;"] > :nth-child(2) > :nth-child(5)'
    ).click();
    cy.get(".-padding-h-8 > .button > .button--content").click();

    const creationDate = new Date();
    const date = getDate(creationDate);
    const time = getTime(creationDate);
    const title = `TDC CodeFights ${date} ${time}`;
    const description = "Torneio realizado no TDC BH 2019 no stand da Dito.";

    cy.get(
      ".-layout-v > :nth-child(1) > .input > .-layout > .input--wrapper > input"
    ).type(title);
    cy.get("textarea").type(description);
    cy.get(".button--content > span").click();
    cy.get(".slide-manager--next > .button > .button--content > span").click();
    cy.get(
      ":nth-child(2) > .input > .-layout > .input--wrapper > input"
    ).clear();
    cy.get(":nth-child(2) > .input > .-layout > .input--wrapper > input").type(
      getTime(creationDate, 6)
    );
    cy.get(":nth-child(3) > .input > .-layout > .input--wrapper > input").type(
      5
    );
    cy.get(
      ".slide-manager--nav-wrapper > :nth-child(3) > .button--content"
    ).click();
  });
});
