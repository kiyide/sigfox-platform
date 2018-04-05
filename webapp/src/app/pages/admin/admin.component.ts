import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {AppSetting, FireLoopRef, Organization, Role, User} from '../../shared/sdk/models';
import {AppSettingApi, OrganizationApi, RealTime, RoleApi, UserApi} from '../../shared/sdk/services';
import {ToasterConfig, ToasterService} from 'angular2-toaster';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-messages',
  templateUrl: './admin.component.html'
})
export class AdminComponent implements OnInit, OnDestroy {

  private myUser: User;
  private userToRemove: User;
  private users: User[] = [];

  private setting: AppSetting;
  private settings: AppSetting[] = [];

  private organization: Organization;
  private organizations: Organization[] = [];

  private userRef: FireLoopRef<User>;
  private userSub: Subscription;

  @ViewChild('updateUserModal') updateUserModal: any;
  @ViewChild('confirmModal') confirmModal: any;

  // Notifications
  private toast;
  public toasterconfig: ToasterConfig =
    new ToasterConfig({
      tapToDismiss: true,
      timeout: 5000,
      animation: 'fade'
    });


  constructor(private rt: RealTime,
              private userApi: UserApi,
              private appSettingApi: AppSettingApi,
              private organizationApi: OrganizationApi,
              private roleApi: RoleApi,
              private toasterService: ToasterService) {

    this.toasterService = toasterService;
  }

  ngOnInit(): void {
    console.log('Admin: ngOnInit');

    // Real Time
    if (this.rt.connection.isConnected() && this.rt.connection.authenticated)
      this.setup();
    else
      this.rt.onAuthenticated().subscribe(() => this.setup());
  }

  setup(): void {
    this.getUsers();
    this.getAppSettings();
    this.getOrganizations();
  }

  getUsers(): void {
    this.myUser = this.userApi.getCachedCurrent();
    this.userRef = this.rt.FireLoop.ref<User>(User);
    this.userSub = this.userRef.on('change', {include: 'roles', order: 'updatedAt DESC'}).subscribe((users: User[]) => {
      users.forEach((user: any) => {
        user.isAdmin = false;
        user.roles.forEach((role: Role) => {
          if (role.name === 'admin') {
            user.isAdmin = true;
            return;
          }
        });
      });
      this.users = users;
    });
  }

  getAppSettings(): void {
    this.appSettingApi.find().subscribe((settings: AppSetting[]) => {
      this.settings = settings;
    });
  }

  getOrganizations(): void {
    console.log('getOrga');
    this.organizationApi.find({include: 'Members'}).subscribe((organizations: Organization[]) => {
      this.organizations = organizations;
      console.log(organizations);
    });
  }

  showRemoveModal(user: User): void {
    this.confirmModal.show();
    this.userToRemove = user;
  }

  deleteUser(): void {
    console.log(this.userToRemove);
    this.userApi.deleteById(this.userToRemove.id).subscribe((value: any) => {
      if (this.toast)
        this.toasterService.clear(this.toast.toastId, this.toast.toastContainerId);
      this.toast = this.toasterService.pop('success', 'Success', 'Account was deleted successfully.');
      this.confirmModal.hide();
      this.getUsers();
    });
  }

  changeSetting(setting: AppSetting): void {
    //setting.value = !setting.value;
    this.appSettingApi.upsert(setting).subscribe((setting: any) => {
      console.log(setting);
    });
  }

  grantAdminAccess(user): void {
    console.log('user: ', user);

    this.roleApi.findOne({where: {name: 'admin'}}).subscribe((admin: any) => {
      console.log('admin: ', admin);

      this.userApi.linkRoles(user.id, admin.id, {'principalType': 'USER', 'roleId': admin.id, 'principalId': user.id}).subscribe(result => {
        console.log(result);
        this.getUsers();
      });
    });
  }

  revokeAdminAccess(user): void {
    console.log('user: ', user);

    this.roleApi.findOne({where: {name: 'admin'}}).subscribe((admin: any) => {
      console.log('admin: ', admin);

      this.userApi.unlinkRoles(user.id, admin.id).subscribe(result => {
        console.log(result);
        this.getUsers();
      });
    });
  }

  deleteOrganization(orga: Organization): void {
    this.organizationApi.deleteById(orga.id).subscribe((value: any) => {
      if (this.toast)
        this.toasterService.clear(this.toast.toastId, this.toast.toastContainerId);
      this.toast = this.toasterService.pop('success', 'Success', 'Organization was deleted successfully.');
    });
  }


  ngOnDestroy(): void {
    console.log('Admin: ngOnDestroy');
    if (this.userRef) this.userRef.dispose();
    if (this.userSub) this.userSub.unsubscribe();
  }

}

