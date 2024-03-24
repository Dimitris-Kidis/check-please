import { IMainMenuItem } from '../main-menu-item/main-menu-item';

export class MainMenuSchema {
  public static mainMenu: IMainMenuItem = {
    nodeNameTranslationKey: 'COMMON.MENU.MAIN',
    nodeIcon: 'fa-dashboard',
    navigationPath: '/main',
  };

  public static newRepairMenu: IMainMenuItem = {
    nodeNameTranslationKey: 'COMMON.MENU.NEW_REPAIR',
    nodeIcon: 'fa-plus',
    navigationPath: '/new-repair',
  };

  public static historyMenu: IMainMenuItem = {
    nodeNameTranslationKey: 'COMMON.MENU.HISTORY',
    nodeIcon: 'fa-book',
    navigationPath: '/history',
  };

  public static clientsMenu: IMainMenuItem = {
    nodeNameTranslationKey: 'COMMON.MENU.CLIENTS',
    nodeIcon: 'fa-user',
    navigationPath: '/clients',
  };

  public static carsMenu: IMainMenuItem = {
    nodeNameTranslationKey: 'COMMON.MENU.CARS',
    navigationPath: '/cars',
    nodeIcon: 'fa-car',
  };

  public static repairsMenu: IMainMenuItem = {
    nodeNameTranslationKey: 'COMMON.MENU.REPAIRS',
    navigationPath: '/repairs',
    nodeIcon: 'fa-wrench',
  };

  public static financeMenu: IMainMenuItem = {
    nodeNameTranslationKey: 'COMMON.MENU.FINANCE',
    navigationPath: '/finance',
    nodeIcon: 'fa-money',
  };

  public static auditMenu: IMainMenuItem = {
    nodeNameTranslationKey: 'COMMON.MENU.AUDIT',
    navigationPath: '/audit',
    nodeIcon: 'fa-pencil',
  };

  public static settingsMenu: IMainMenuItem = {
    nodeNameTranslationKey: 'COMMON.MENU.SETTINGS',
    navigationPath: '/settings',
    nodeIcon: 'fa-gear',
  };
}
