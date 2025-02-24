import { ROLES } from "../../utils/constant";
import { useSelector } from "react-redux"

const Dashboard = () => {
    const user = useSelector((store) => store.user.user);

    if (!user) {
        return <h1>Loading...</h1>
    }

    switch (user.role) {
        case ROLES.ADMIN:
            return <h1>Welcome Admin</h1>
        case ROLES.MANAGER:
            return <h1>Welcome User</h1>
        case ROLES.EMPLOYEE:
            return <div>
                Welcome Employee.
            </div>
        default:
            return <h1>Invalid Role</h1>
    }
}

export default Dashboard
