import { Controller, Get, Query, HttpException, UnprocessableEntityException, Post, Body, ParseIntPipe } from '@nestjs/common';

import { AppService } from './app.service';
import { delay, Observable } from 'rxjs';
import { QuotesDto, LoginDto, SessionDto, ProfileModel } from "@core";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData() {
    return this.appService.getData();
  }

  /**
   * Quote database search
   *
   * @param q string search query string
   */
  @Get('quotes')
  getQuotes(@Query('q') q: string = ''): Observable<QuotesDto> {
    if (q.length > 14) {
      throw new UnprocessableEntityException('Query to long Exception');
    }
    return this.appService.searchQuotes(q).pipe(
      delay(1500),
    );
  }

  /**
   * Get access token by credentials
   *
   * @param email
   * @param password
   */
  @Post('login')
  login(@Body('email') email: string = '', @Body('password') password: string = ''): Observable<LoginDto> {
    if(!email || !password) {
      throw new UnprocessableEntityException('Email & Password are required')
    }
    return this.appService.login(email, password);
  }

  /**
   * Get user by session token
   *
   * @param token
   */
  @Post('session')
  session(@Body('token') token: string = ''): Observable<SessionDto> {
    if(!token) {
      throw new UnprocessableEntityException('Token is required')
    }
    return this.appService.getSessionByToken(token);
  }

  /**
   * Get user profile by user id
   *
   * @param token
   */
  @Post('profile')
  profile(@Body('userId', ParseIntPipe) userId: number): Observable<ProfileModel> {
    if(!userId) {
      throw new UnprocessableEntityException('userId is required')
    }
    return this.appService.getProfileByUserId(userId);
  }
}
