export class MenuSchema {
  public static menuTabs: IMenuTab[] = [
    { label: 'Главная', icon: 'home', route: '/main' },
    { label: 'Новый ремонт', icon: 'add_circle', route: '/new' },
    { label: 'Ремонты', icon: 'history', route: '/repairs' },
    { label: 'Клиенты', icon: 'people', route: '/clients' },
    { label: 'Машины', icon: 'directions_car', route: '/cars' },
  ];
}

export interface IMenuTab {
  label: string;
  icon: string;
  route: string;
}
