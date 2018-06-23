import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  LoadingController,
  NavParams,
  ToastController
} from "ionic-angular";
import { HttpClient } from "@angular/common/http";

@IonicPage()
@Component({
  selector: "page-comments",
  templateUrl: "comments.html"
})
export class CommentsPage {
  public items: Array<any>;
  public netavailable: string;
  private _HOST: string = "https://aroshamobileapp.herokuapp.com/";

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private _TOAST: ToastController,
    private _HTTP: HttpClient,
    public loading: LoadingController
  ) {}
  ionViewDidEnter(): void {
    this.retrieve();
  }
  updateRecord(item: any): void {
    let recordID: string = item._id,
      url: any = this._HOST + "api/comments/" + recordID;
    this._HTTP.put(url, recordID).subscribe(
      (data: any) => {
        this.retrieve();
        this.displayNotification("Comment Approved!");
      },
      (error: any) => {
        console.dir(error);
      }
    );
  }

  deleteRecord(item: any): void {
    let recordID: string = item._id,
      url: any = this._HOST + "api/comments/" + recordID;
    this._HTTP.delete(url).subscribe(
      (data: any) => {
        this.retrieve();
        this.displayNotification("Comment successfully deleted");
      },
      (error: any) => {
        console.dir(error);
      }
    );
  }

  displayNotification(message: string): void {
    let toast = this._TOAST.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }

  retrieve(): void {
    let loader = this.loading.create({
      content: "Fetching data from server..."
    });
    this._HTTP.get(this._HOST + "api/comments").subscribe(
      (data: any) => {
        loader.dismiss();
        this.items = data.records;
        console.log(this.items);
      },
      (error: any) => {
        loader.dismiss();
        console.dir(error);
      }
    );
  }
  ionViewDidLoad() {
    console.log("ionViewDidLoad CommentsPage");
  }
}
