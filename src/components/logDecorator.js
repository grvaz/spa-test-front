export const TYPE_CREATE_CONTACT = 'create_contact';
export const TYPE_ATTACH_CONTACT = 'attach_contact';

export const TYPE_NAMES = {
    [TYPE_CREATE_CONTACT]: 'Создание контакта',
    [TYPE_ATTACH_CONTACT]: 'Привязка контакта',
};

export const getActionResult = function (log) {
    if (!log) {
        return '';
    }
    return log.success ? 'Успешно' : 'Ошибка';
}

export const getActionName = function (log) {
    if (!log) {
        return '';
    }
    return TYPE_NAMES[log.type];
}