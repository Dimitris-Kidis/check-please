export class MenuSchema {
  public static menuTabs: IMenuTab[] = [
    { label: 'Главная', icon: 'home', route: '/main' },
    { label: 'Новая', icon: 'add_circle', route: '/new' },
    { label: 'История', icon: 'history', route: '/history' },
    { label: 'Клиенты', icon: 'people', route: '/clients' },
    { label: 'Машины', icon: 'directions_car', route: '/cars' },
  ];
}

export interface IMenuTab {
  label: string;
  icon: string;
  route: string;
}
