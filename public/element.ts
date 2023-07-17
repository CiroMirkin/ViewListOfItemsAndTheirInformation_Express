function showTitleElement (title: string): any {
    document.querySelector<HTMLElement>('#elementName')!.innerText = title.trim();
}
const urlOfTheActualPage = new URL(location.href);
const elementName = urlOfTheActualPage.pathname.split('/')[2];
showTitleElement(elementName);