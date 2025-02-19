import { NgModule } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faArrowsRotate,
  faCalendar,
  faCar,
  faCopyright,
  faEye,
  faFileSignature,
  faGauge,
  faIdCard,
  faMagnifyingGlass,
  faPhone,
  faPlus,
  faQuestionCircle,
  faTimes,
  faUser,
} from '@fortawesome/free-solid-svg-icons';

@NgModule({
  imports: [FontAwesomeModule],
})
export class IconsModule {
  public constructor(domSanitizer: DomSanitizer, matIconRegistry: MatIconRegistry, library: FaIconLibrary) {
    library.addIcons(faMagnifyingGlass);
    library.addIcons(faCar);
    library.addIcons(faEye);
    library.addIcons(faUser);
    library.addIcons(faPlus);
    library.addIcons(faPhone);
    library.addIcons(faGauge);
    library.addIcons(faTimes);
    library.addIcons(faIdCard);
    library.addIcons(faCopyright);
    library.addIcons(faFileSignature);
    library.addIcons(faQuestionCircle);
    library.addIcons(faCalendar);
    library.addIcons(faArrowsRotate);

    matIconRegistry
      .addSvgIcon('sun-icon', domSanitizer.bypassSecurityTrustResourceUrl('assets/images/sun.svg'))
      .addSvgIcon('moon-icon', domSanitizer.bypassSecurityTrustResourceUrl('assets/images/moon.svg'))
      .addSvgIcon('dashboard-icon', domSanitizer.bypassSecurityTrustResourceUrl('assets/images/link.svg'))
      .addSvgIcon('project-icon', domSanitizer.bypassSecurityTrustResourceUrl('assets/images/folder.svg'))
      .addSvgIcon('groups-icon', domSanitizer.bypassSecurityTrustResourceUrl('assets/images/users.svg'))
      .addSvgIcon('profile-icon', domSanitizer.bypassSecurityTrustResourceUrl('assets/images/user.svg'))
      .addSvgIcon('panel-icon', domSanitizer.bypassSecurityTrustResourceUrl('assets/images/tool.svg'))
      .addSvgIcon('logout-icon', domSanitizer.bypassSecurityTrustResourceUrl('assets/images/log-out.svg'))
      .addSvgIcon(
        'section-arrow',
        domSanitizer.bypassSecurityTrustResourceUrl('assets/images/chevron-down-svgrepo-com.svg'),
      )
      .addSvgIcon('menu-activity', domSanitizer.bypassSecurityTrustResourceUrl('assets/images/ico-menu-activity.svg'))
      .addSvgIcon(
        'menu-administration',
        domSanitizer.bypassSecurityTrustResourceUrl('assets/images/ico-menu-administration.svg'),
      )
      .addSvgIcon('menu-company', domSanitizer.bypassSecurityTrustResourceUrl('assets/images/ico-menu-company.svg'))
      .addSvgIcon('menu-contact', domSanitizer.bypassSecurityTrustResourceUrl('assets/images/ico-menu-contact.svg'))
      .addSvgIcon('menu-dashboard', domSanitizer.bypassSecurityTrustResourceUrl('assets/images/ico-menu-dashboard.svg'))
      .addSvgIcon(
        'menu-instruction',
        domSanitizer.bypassSecurityTrustResourceUrl('assets/images/ico-menu-instruction.svg'),
      )
      .addSvgIcon(
        'menu-marketing',
        domSanitizer.bypassSecurityTrustResourceUrl('assets/images/ico-menu-marketing-list.svg'),
      )
      .addSvgIcon('menu-pitch', domSanitizer.bypassSecurityTrustResourceUrl('assets/images/ico-menu-pitch.svg'))
      .addSvgIcon('menu-property', domSanitizer.bypassSecurityTrustResourceUrl('assets/images/ico-menu-property.svg'))
      .addSvgIcon('menu-referral', domSanitizer.bypassSecurityTrustResourceUrl('assets/images/ico-menu-referral.svg'))
      .addSvgIcon('menu-report', domSanitizer.bypassSecurityTrustResourceUrl('assets/images/ico-menu-report.svg'))
      .addSvgIcon(
        'menu-requirement',
        domSanitizer.bypassSecurityTrustResourceUrl('assets/images/ico-menu-requirement.svg'),
      )
      .addSvgIcon('menu-tenancy', domSanitizer.bypassSecurityTrustResourceUrl('assets/images/ico-menu-tenancy.svg'))
      .addSvgIcon('submenu-create', domSanitizer.bypassSecurityTrustResourceUrl('assets/images/ico-submenu-create.svg'))
      .addSvgIcon(
        'submenu-reports',
        domSanitizer.bypassSecurityTrustResourceUrl('assets/images/ico-submenu-reports.svg'),
      )
      .addSvgIcon('submenu-search', domSanitizer.bypassSecurityTrustResourceUrl('assets/images/ico-submenu-search.svg'))
      .addSvgIcon(
        'submenu-view',
        domSanitizer.bypassSecurityTrustResourceUrl('assets/images/ico-submenu-view-reports.svg'),
      )
      .addSvgIcon('go-back', domSanitizer.bypassSecurityTrustResourceUrl('assets/images/go-back-icon.svg'))
      .addSvgIcon('preview', domSanitizer.bypassSecurityTrustResourceUrl('assets/images/ico-preview.svg'))
      .addSvgIcon('kf-logo', domSanitizer.bypassSecurityTrustResourceUrl('assets/images/kf-logo-icon.svg'))
      .addSvgIcon(
        'map-marker-radius',
        domSanitizer.bypassSecurityTrustResourceUrl('assets/images/map-marker-radius.svg'),
      )
      .addSvgIcon('map-marker-path', domSanitizer.bypassSecurityTrustResourceUrl('assets/images/map-marker-path.svg'))
      .addSvgIcon('log-call', domSanitizer.bypassSecurityTrustResourceUrl('assets/images/ico-log-call.svg'))
      .addSvgIcon('generate-pdf', domSanitizer.bypassSecurityTrustResourceUrl('assets/images/generate-pdf.svg'))
      .addSvgIcon('ico-users', domSanitizer.bypassSecurityTrustResourceUrl('assets/images/ico-users.svg'))
      .addSvgIcon('downgrade-icon', domSanitizer.bypassSecurityTrustResourceUrl('assets/images/downgrade-icon.svg'))
      .addSvgIcon('upgrade-icon', domSanitizer.bypassSecurityTrustResourceUrl('assets/images/upgrade-icon.svg'))
      .addSvgIcon('plus-icon', domSanitizer.bypassSecurityTrustResourceUrl('assets/images/plus-symbol-button.svg'))
      .addSvgIcon('trash-icon', domSanitizer.bypassSecurityTrustResourceUrl('assets/images/trash-can-svgrepo-com.svg'))
      .addSvgIcon('send-icon', domSanitizer.bypassSecurityTrustResourceUrl('assets/images/send.svg'))
      .addSvgIcon(
        'edit-pencil-icon',
        domSanitizer.bypassSecurityTrustResourceUrl('assets/images/pencil-edit-button-svgrepo-com.svg'),
      )
      .addSvgIcon(
        'drag-drop-icon',
        domSanitizer.bypassSecurityTrustResourceUrl('assets/images/drag-dots-svgrepo-com.svg'),
      )
      .addSvgIcon(
        'remove-option',
        domSanitizer.bypassSecurityTrustResourceUrl('assets/images/cancel-button-svgrepo-com.svg'),
      );
  }
}
