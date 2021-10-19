import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {distinctUntilChanged, first, map} from 'rxjs/operators';
import {Member} from '../../../logic/models/member';

interface MembersManagementVmState {
  selectedMember: Member;
  members: Member[];
}


const DEFAULT_STATE: MembersManagementVmState = {
  selectedMember: null,
  members: []
};

@Injectable()
export class MembersManagementViewModel {

  private store: BehaviorSubject<MembersManagementVmState>;
  private state$: Observable<MembersManagementVmState>;

  constructor() {
    this.store = new BehaviorSubject(DEFAULT_STATE);
    this.state$ = this.store.asObservable();
  }

  public resetStore(): void {
    this.store.next(DEFAULT_STATE);
  }

  private getCurrentState(): Promise<MembersManagementVmState> {
    return this.state$.pipe(first()).toPromise();
  }

  private updateState(state: MembersManagementVmState): void {
    this.store.next(state);
  }

  public get selectedMember$(): Observable<Member> {
    return this.state$.pipe(map(state => state.selectedMember), distinctUntilChanged());
  }

  public get members$(): Observable<Member[]> {
    return this.state$.pipe(map(state => state.members), distinctUntilChanged());
  }

  public async dispatchSelectedMember(selectedMember: Member): Promise<void> {
    const currentState = await this.getCurrentState();
    this.updateState({ ...currentState, selectedMember });
  }

  public async dispatchMembers(members: Member[]): Promise<void> {
    const currentState = await this.getCurrentState();
    this.updateState({ ...currentState, members });
  }


}


