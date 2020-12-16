import {EGender} from 'app/core/domain/EGender';
import {IImage} from 'app/core/domain/IImage';

export class IUserForm {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    langKey: string;
    address: string;
    gender: EGender;
    phoneNumber: string;
    image: IImage;
    createdDate: Date;

    public constructor(init?: Partial<IUserForm>) {
        Object.assign(this, init);
    }
}
