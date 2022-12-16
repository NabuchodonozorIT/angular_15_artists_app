import { Injectable, NotFoundException, UnprocessableEntityException, ForbiddenException } from '@nestjs/common';
import { quotesData, sessionsData, profileData } from "./data";
import { Observable, of } from 'rxjs';
import { QuotesDto, SessionModel, LoginDto, SessionDto, ProfileModel } from "@core";

@Injectable()
export class AppService {
  getData(): { message: string } {
    return { message: 'Welcome to api!' };
  }

  searchQuotes(query: string): Observable<QuotesDto> {

    const queryReg = new RegExp(query, 'i');
    const page = 1;
    const pageSize = 5;
    const quotes = quotesData.filter(row => row.text.search(queryReg) >= 0)
    const data = quotes.slice(page-1 * pageSize).slice(0, pageSize);

    return of({
      page,
      pageSize,
      total: quotes.length,
      data,
    });
  }

  login(email: string, password: string): Observable<LoginDto> {
    const session: SessionModel = sessionsData.find(sess => sess.user.email === email && sess.user.password === password)
    if(!session) {
      throw new ForbiddenException('Credentials incorrect');
    }
    return of({
      token: session.token
    });

  }

  getSessionByToken(token: string): Observable<SessionDto> {
    const session: SessionModel = sessionsData.find(sess => sess.token === token)
    if(!session) {
      throw new ForbiddenException('Token incorrect');
    }
    return of({
      token: session.token,
      user: session.user
    });

  }

  getProfileByUserId(userId: number): Observable<ProfileModel> {
    const profile: ProfileModel = profileData.find(p => p.userId === userId)
    if(!profile) {
      throw new ForbiddenException('Token incorrect');
    }
    return of(profile);
  }
}
