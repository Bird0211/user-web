import { Component,
          OnInit,
          TemplateRef,
          ViewChild, } from '@angular/core';
import { PostModel, User } from 'src/app/interface';
import { PostService } from 'src/app/service/post.service';
import { UserService } from 'src/app/service/user.service';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']

})
export class UsersComponent implements OnInit {

  users: User[] = [];
  posts: PostModel[] = [];
  displayedColumns: string[] = ['id', 'name', 'username', 'email', 'post'];
  displayedPostColumns: string[] = ['id','title','body'];
  
  @ViewChild('postuserTml')
  postUserTmpRef!: TemplateRef<any> ;

  ngOnInit(): void {
    this.loadUsers();    
  }


  constructor(private userService: UserService,
        private postService: PostService,
        private dialog: MatDialog,
        ) { 


  }


  loadUsers() {
    this.userService.allUsers().subscribe((users: User[]) => {
        this.users = users;
    });
  }

  close() {

  }

  loadPostByUserId(userId: number) {
    this.postService.postsByUserId(userId).subscribe((posts: PostModel[]) => {
      this.posts = posts;
      console.log(posts);
      
      this.openDialog(posts);
    });
  }

  openDialog(posts: PostModel[]) {
    let config: MatDialogConfig = {
      width: '800px',
      data: posts
    };

    this.dialog.open(this.postUserTmpRef, config);
  }
  
}