import { useRef } from "react";
import { useForm } from "react-hook-form";
import parse from 'date-fns/parse';
import format from 'date-fns/format';

import AppLayout from "../../components/AppLayout";

function splitString (n,str){
  let arr = str?.split(' ');
  let result=[]
  let subStr=arr[0]
  for(let i = 1; i < arr.length; i++){
      let word = arr[i]
      if(subStr.length + word.length + 1 <= n){
          subStr = subStr + ' ' + word
      }
      else{
          result.push(subStr);
          subStr = word
      }
  }
  if(subStr.length){result.push(subStr)}
  return result
}

const UdemyCertificate = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const canvasRef = useRef();

  const initCanvas = (callback) => {
    const context = canvasRef.current.getContext('2d');

    // reset
    context.clearRect(0, 0, canvasRef.current?.width, canvasRef.current?.height);

    // image draw
    const image = new Image();
    image.src = "/assets/images/certificate-template.jpg";

    
    image.onload = () => {
      context.drawImage(image, 0, 0, canvasRef.current?.width, canvasRef.current?.height);
      callback && callback();
    };
  };
  
  const writeText = (text, x, y, option = {}) => {
    const context = canvasRef.current.getContext('2d');

    context.beginPath();
    if (option.font) {
      let font = '';
      if (option.font.weight) 
        font = font + option.font.weight + ' ';

      if (option.font.size)
        font = font + option.font.size + 'px ';

      if (option.font.family)
        font = font + option.font.family;

      context.font = font;
    }
    
    if (option.textBaseline) context.textBaseline = option.textBaseline;
    if(option.fillStyle) context.fillStyle = option.fillStyle;
    const lines = text.split('\n');
    lines.forEach((line, i) => {
      context.fillText(line, x, y + (i * (option.font.size + 15)));
    });

    context.stroke();
  };

  const downloadCertificate = () => {
    const image = canvasRef.current.toDataURL("image/png");

    const link = document.createElement('a');
    link.download = "certificate.png";
    link.href = image;
    link.click();
  };

  const onSubmit = data => {
    initCanvas(() => {
      const arrayString = splitString(30, data?.courseName);
      writeText(arrayString.join("\n"), 83, 312, {
        font: {
          size: 80,
          weight: "bold",
          family: "Times New Roman"
        },
        textBaseline: "top",
        fillStyle: "#1c1d1f",
      });

      writeText(data?.instructors, 192, 512, {
        font: {
          size: 18,
          weight: "bold",
          family: "Arial"
        },
        textBaseline: "top",
        fillStyle: "#1c1d1f",
      });

      writeText(data?.userName, 83, 808, {
        font: {
          size: 54,
          weight: "bold",
          family: "Arial"
        },
        textBaseline: "top",
        fillStyle: "#1c1d1f",
      });

      const completionDate = parse(data?.date, 'yyyy-MM-dd', new Date());
      const formatedDate = format(completionDate, "MMM dd, yyyy");

      writeText(formatedDate, 138, 886, {
        font: {
          size: 20,
          weight: "bold",
          family: "Arial"
        },
        textBaseline: "top",
        fillStyle: "#1c1d1f",
      });

      writeText(data?.courseLength + " total hours", 158, 918, {
        font: {
          size: 20,
          weight: "bold",
          family: "Arial"
        },
        textBaseline: "top",
        fillStyle: "#1c1d1f",
      });

      downloadCertificate();
    });

    const qs = new URLSearchParams(data).toString();
    window.open(`./udemy-invoice?${qs}`, "_blank");
  }

  return (
    <AppLayout>
      <section>
        <div className="container py-4">
          <h4>Udemy Certificate</h4>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
              <div className="col-12 col-md-6">
                <input
                  placeholder="User Name"
                  className="form-control"
                  type="text"
                  {...register("userName", { required: true })}
                />
                {errors.userName && <div className="text-danger small">This field is required</div>}
              </div>
              <div className="col-12 col-md-6">
                <input
                  placeholder="Email"
                  className="form-control"
                  type="text"
                  {...register("email", { required: true })}
                />
                {errors.email && <div className="text-danger small">This field is required</div>}
              </div>
              <div className="col-12 col-md-6">
                <input
                  placeholder="Course Name"
                  className="form-control"
                  type="text"
                  {...register("courseName", { required: true })}
                />
                {errors.courseName && <div className="text-danger small">This field is required</div>}
              </div>
              <div className="col-12 col-md-6">
                <input
                  placeholder="Instructors"
                  className="form-control"
                  type="text"
                  {...register("instructors", { required: true })}
                />
                {errors.instructors && <div className="text-danger small">This field is required</div>}
              </div>
              <div className="col-12 col-md-6">
                <input
                  placeholder="Date"
                  className="form-control"
                  type="date"
                  {...register("date", { required: true })}
                />
                {errors.date && <div className="text-danger small">This field is required</div>}
              </div>
              <div className="col-12 col-md-6">
                <input
                  placeholder="Course Length"
                  className="form-control"
                  type="number"
                  step="0.01"
                  min="0"
                  {...register("courseLength", { required: true })}
                />
                {errors.courseLength && <div className="text-danger small">This field is required</div>}
              </div>
              <div className="col-12 col-md-6">
                <input
                  placeholder="Course Price"
                  className="form-control"
                  type="number"
                  step="0.01"
                  min="0"
                  {...register("coursePrice", { required: true })}
                />
                {errors.coursePrice && <div className="text-danger small">This field is required</div>}
              </div>
              <div className="col-12 mt-3">
                <button type="submit" className="btn btn-primary">
                  Create Certificate
                </button>
              </div>
            </div>
          </form>
        </div>
        <canvas style={{display: 'none'}} ref={canvasRef} height={1003} width={1349}/>
      </section>
    </AppLayout>
  );
};

export default UdemyCertificate;
