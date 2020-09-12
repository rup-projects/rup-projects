import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Member } from '../../../models/member';
import { MemberService } from '../../../services/member.service';

@Component({
  selector: 'app-members-management',
  templateUrl: './members-management.component.html',
  styleUrls: ['./members-management.component.scss']
})
export class MembersManagementComponent implements OnInit {

  members: Observable<Member[]>;

  constructor(private memberService: MemberService) {
    this.members = this.memberService.openMembers();
  }

  ngOnInit(): void {
  }

}
