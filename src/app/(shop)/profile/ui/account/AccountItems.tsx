
import { User } from "@/interfaces";
import { AccountItem } from './AccountItem';
import { formattDate } from "@/utils";

interface Props {
    user: Omit<User, "password">;
}

export const AccountItems = ({user} : Props) => {
  return (
    <div className="flex flex-col gap-2">
        <AccountItem 
          value={user.name ?? null}
          field="name"
          label="Name:"
        />
        <AccountItem 
          field="role"
          label="Role:"
          value={user.role ?? null}
          isEditable={false}
          className={"capitalize"}
        />
        <AccountItem 
          value={user.email ?? null}
          field="email"
          label="Email:"
        />
        <AccountItem 
          label="Email Verified:"
          field="emailVerified"
          isEditable={false}
          value={user.emailVerified !== null ? formattDate(user.emailVerified) : "Pending"}
        />
        <AccountItem 
          value={user.phone ?? null}
          field="phone"
          label="Phone:"
        />
        <AccountItem 
          field="createdAt"
          label="Created At:"
          isEditable={false}
          value={formattDate(user.createdAt)}
        />
    </div>
  )
}
