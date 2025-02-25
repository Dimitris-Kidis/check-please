export class MenuSchema {
  public static menuTabs: IMenuTab[] = [
    { label: 'MAIN.LABEL.MAIN', icon: 'home', route: '/main' },
    { label: 'MAIN.LABEL.NEW_REPAIR', icon: 'add_circle', route: '/new' },
    { label: 'MAIN.LABEL.REPAIRS', icon: 'history', route: '/repairs' },
    { label: 'MAIN.LABEL.CLIENTS', icon: 'people', route: '/clients' },
    { label: 'MAIN.LABEL.CARS', icon: 'directions_car', route: '/cars' },
  ];
}

export interface IMenuTab {
  label: string;
  icon: string;
  route: string;
}
