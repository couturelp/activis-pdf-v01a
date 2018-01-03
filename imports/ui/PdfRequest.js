import React  from 'react';
import { Link } from 'react-router-dom';

export default class PdfRequest extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        error: '' 
      };
  }
  onSubmit(e){
      e.preventDefault();
      let email = this.refs.email.value.trim();
      let userInfos = {
        firstname:this.refs.firstname.value.toUpperCase(),
        lastname:this.refs.lastname.value.toUpperCase(),
        phone:this.refs.phone.value,
        email:email,
        bottomOne:this.refs.bottomOne.value.toUpperCase(),
        bottomTwo:this.refs.bottomTwo.value,
        bottomThree:this.refs.bottomThree.value
      };

      Meteor.call('pdf.create', userInfos);
  }
  componentDidMount(){
    if (Meteor.userId()){
      this.props.history.replace('/pdfrequest');
    }

    let url = 'activis-pdf-TANGUAY.pdf';
    PDFJS.workerSrc = '/packages/pascoual_pdfjs/build/pdf.worker.js';
    // Create PDF
    PDFJS.getDocument(url).then(function getPdfHelloWorld(pdf) {
      // Fetch the first page
      pdf.getPage(1).then(function getPageHelloWorld(page) {
        var scale = 0.06;
        var viewport = page.getViewport(scale);
    
        // Prepare canvas using PDF page dimensions
        var canvas = document.getElementById('pdfcanvas');
        var context = canvas.getContext('2d');
        canvas.height = 400;
        canvas.width = 700;
    
        // Render PDF page into canvas context
        page.render({canvasContext: context, viewport: viewport}).promise.then(function () {
          console.log("done");
        });
      });
    });
    
  };
  render(){
    return (
      <div className="boxed-view">
        <div className="boxed-view__box">
            <h1>Request PDF</h1>

            {this.state.error ? <p>{this.state.error}</p> : undefined}

            <p>We are currently generating PDFs.</p>
            
            <form onSubmit={this.onSubmit.bind(this)} noValidate className="boxed-view__form">
                <input type="text" ref="firstname" name="firstname" placeholder="First Name" noValidate/>
                <input type="text" ref="lastname" name="lastname" placeholder="Last Name" noValidate/>
                <input type="text" ref="phone" name="phone" placeholder="Phone" noValidate/>
                <input type="email" ref="email" name="email" placeholder="Email" noValidate/>
                <input type="text" ref="bottomOne" name="bottomOne" placeholder="Agency Name" noValidate/>
                <input type="text" ref="bottomTwo" name="bottomTwo" placeholder="Agency Type" noValidate/>
                <input type="text" ref="bottomThree" name="bottomThree" placeholder="Agency Phone" noValidate/>
                <button className="button">Create PDF</button>
            </form>
        </div>
        <div className="pdf-view">
          <div className="pdf-view__box">
            <canvas id="pdfcanvas"></canvas>
          </div>
        </div>
      </div>
    );
  }
}