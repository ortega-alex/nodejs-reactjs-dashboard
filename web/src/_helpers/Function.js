import { message as Message } from 'antd';

function message(typo, menssage) {
    Message[typo](menssage);
}

const Function = {
    message
}
export default Function;
