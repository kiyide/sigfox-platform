// import { BootScript } from '@mean-expert/boot-script';
//
// @BootScript()
// class Role {
//   constructor(app: any) {
//
//
//   }
// }
//
// module.exports = Role;

module.exports = function (app) {
  var Role = app.models.Role;
  var User = app.models.user;
  var RoleMapping = app.models.RoleMapping;

  var errorMessage = "";

  RoleMapping.settings.strictObjectIDCoercion = true;

  // RoleMapping.belongsTo(User);
  // User.hasMany(RoleMapping, {foreignKey: 'principalId'});
  // Role.hasMany(User, {through: RoleMapping, foreignKey: 'roleId'});


  Role.registerResolver('organizationMember', function (role, context, cb) {

    //cb(null, true);

    // console.log("Role: ", role);
    //console.log("context: ", context);

    function reject() {
      //console.log("Reject");
      process.nextTick(function () {
        cb("RoleResolver Error", false);
      });

    }

    function authorize() {
      //console.log("Authorize");
      process.nextTick(function () {
        cb(null, true);
      });

    }

    // do not allow anonymous users
    var userId = context.accessToken.userId;
    if (!userId) {
      //console.log("callback 1: !userId");
      return reject();
    }
    //if the target model is not project
    else if (context.modelName === 'Organization') {
      if(!context.modelId){

        //Is admin?
        User.findById(userId, {include : 'roles'}, function(err, object){
          var roles = object.toJSON().roles;
          var authorized = false;
          roles.forEach(function(role, index, array){
            if(role.name === 'admin'){
              authorized = true;
              return authorized;
            }else if (index === array.length - 1 && authorized === false){
              if (!cb) return reject();
            }
          })

        });

      }else {
        context.model.findById(context.modelId, {include: 'Members'}, function (err, object) {
          if (err || !object) {
            return reject();
          } else if (!object.Members) {
            //console.log("callback 2: No members");
            return reject();
          } else {

            //Check if user is a member of the organization
            //console.log(object);
            var members = object.toJSON().Members;
            var authorized = false;
            members.forEach(function (member, index, array) {

              if (member.id.toString() === userId.toString()) {
                //console.log("callback 3: Authorize");
                authorized = true;
                return authorize();
              } else if (index === array.length - 1 && authorized === false) {
                //console.log("callback 4: Member not in organization");
                if (!cb) return reject();
              }
            });

          }

        });
      }
    }else{
      //console.log("callback 5: else");
      return reject();
    }

  });


};
