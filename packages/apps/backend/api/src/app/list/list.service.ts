import { Injectable } from '@nestjs/common';
import { HttpService } from "@nestjs/axios";
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';

@Injectable()
export class ListService {

    constructor(
    private readonly httpService: HttpService,
    ) {}


    getListT(): Observable<AxiosResponse<any>> {
        return this.httpService.get('https://kudago.com/public-api/v1.3/search/?q=place&ctype=place');
    }

}
