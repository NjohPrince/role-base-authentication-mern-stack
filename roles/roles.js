// user roles
const AccessControl = require("accesscontrol");
const access = new AccessControl();

exports.roles = (function () {
  // USER_ADMIN PERMISSIONS
  access.grant("USER_ADMIN").readOwn("profile").updateOwn("profile");

  // VEHICLE_ADMIN PERMISSIONS
  access.grant("VEHICLE_ADMIN").extend("USER_ADMIN").readAny("profile");

  // SUPER_ADMIN PERMISSIONS
  access
    .grant("SUPER_ADMIN")
    .extend("USER_ADMIN")
    .extend("VEHICLE_ADMIN")
    .updateAny("profile")
    .deleteAny("profile");

  return access;
})();
