export const UserRolesEnum = {
    ADMIN: "admin",
    PROJECT_ADMIN: "project_admin",
    MEMBER: "member"
};

export const AvailableUserRoles = Object.values(UserRolesEnum);
// ["admin", "project_admin", "member"]

export const TaskStatusEnum = {
    TODO: "todo",
    DONE: "done",
    IN_PROGRESS: "in_progress"
};

export const AvailableTaskStatus = Object.values(TaskStatusEnum);
// ["todo", "done", "in_progress"]