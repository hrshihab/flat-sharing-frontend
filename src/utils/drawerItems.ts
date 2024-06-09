import { USER_ROLE } from "@/contants/role";
import { DrawerItem, UserRole } from "@/types";
import DashboardIcon from "@mui/icons-material/Dashboard";
import GroupIcon from "@mui/icons-material/Group";
import PersonIcon from "@mui/icons-material/Person";
import KeyIcon from "@mui/icons-material/Key";
import PostAddIcon from "@mui/icons-material/PostAdd";
import DomainAddOutlinedIcon from "@mui/icons-material/DomainAddOutlined";
import HandshakeOutlinedIcon from "@mui/icons-material/HandshakeOutlined";
import SocialDistanceOutlinedIcon from "@mui/icons-material/SocialDistanceOutlined";
import UnpublishedOutlinedIcon from "@mui/icons-material/UnpublishedOutlined";
import PublishedWithChangesOutlinedIcon from "@mui/icons-material/PublishedWithChangesOutlined";
import TaskAltOutlinedIcon from "@mui/icons-material/TaskAltOutlined";
export const drawerItems = (role: UserRole): DrawerItem[] => {
  const roleMenus: DrawerItem[] = [];
  const defaultMenus = [
    {
      title: "Profile",
      icon: PersonIcon,
      children: [
        {
          title: "Edit Profile",
          path: `/profile/my-edit-profile`,
          icon: PersonIcon,
        },
        {
          title: "My Flat Posts",
          path: `/profile/my-flat-post`,
          icon: PostAddIcon,
        },
        {
          title: "My Flat Requests",
          path: `/profile/my-flat-request`,
          icon: HandshakeOutlinedIcon,
        },
        {
          title: "Change Password",
          path: `/change-password`,
          icon: KeyIcon,
        },
      ],
    },
  ];
  // booking menu has sub section pending , approved , rejected
  const BookingMenus = [
    {
      title: "Booking",
      icon: HandshakeOutlinedIcon,
      children: [
        {
          title: "Pending",
          path: `${role}/booking/pending`,
          icon: PublishedWithChangesOutlinedIcon,
        },
        {
          title: "Approved",
          path: `${role}/booking/approve`,
          icon: TaskAltOutlinedIcon,
        },
        {
          title: "Rejected",
          path: `${role}/booking/rejected`,
          icon: UnpublishedOutlinedIcon,
        },
      ],
    },
  ];

  switch (role) {
    case USER_ROLE.ADMIN:
      roleMenus.push(
        {
          title: "Dashboard",
          path: `${role}`,
          icon: DashboardIcon,
        },
        {
          title: "Manage Users",
          path: `${role}/manageUsers`,
          icon: GroupIcon,
        },
        {
          title: "Flat Post",
          path: `${role}/flatPost`,
          icon: PostAddIcon,
        },
        {
          title: "Flat Manage",
          path: `${role}/flatManage`,
          icon: DomainAddOutlinedIcon,
        }
      );
      break;

    case USER_ROLE.USER:
      roleMenus.push(
        {
          title: "Flat Post",
          path: `${role}/flatPost`,
          icon: PostAddIcon,
        },
        {
          title: "Flat Share Requests",
          path: `${role}/booking/pending`,
          icon: SocialDistanceOutlinedIcon,
        }
      );
      break;

    default:
      break;
  }

  return [...roleMenus, ...BookingMenus, ...defaultMenus];
};
