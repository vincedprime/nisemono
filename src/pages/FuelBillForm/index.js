import { format, parse } from "date-fns";
import random from "lodash.random";
import round from "lodash.round";
import { useRef } from "react";
import { useForm } from "react-hook-form";

import AppLayout from "../../components/AppLayout";

const FuelBillForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const canvasRef = useRef();

  const initCanvas = (callback) => {
    const context = canvasRef.current.getContext('2d');

    // reset
    context.clearRect(0, 0, canvasRef.current?.width, canvasRef.current?.height);

    // image draw
    const image = new Image();
    image.src = "/assets/images/fuel-bill-template.jpg";

    
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

  const downloadBill = () => {
    const image = canvasRef.current.toDataURL("image/png");

    const link = document.createElement('a');
    link.download = "bill.png";
    link.href = image;
    link.click();
  };

  const onSubmit = data => {
    initCanvas(() => {
      const volume = round(parseFloat(data?.price) / parseFloat(data?.rate), 2).toFixed(2);
      const price = round(parseFloat(data?.price), 2).toFixed(2);
      const rate = round(parseFloat(data?.rate), 2).toFixed(2);
      const date = parse(data?.date, "yyyy-MM-dd'T'HH:mm", new Date());
      const time = format(date, "HH:mm:ss");
      const txnId = random(100000, 999999);
      const billNo = random(100000, 999999);
      const mobileNo = random(1000000, 9999999);

      writeText(data?.pumpName?.toUpperCase(), 32, 342, {
        font: {
          size: 36,
          weight: "bold",
          family: "Merchant Copy"
        },
        textBaseline: "top",
        fillStyle: "#3d3c3a",
      });

      writeText(data?.city?.toUpperCase(), 32, 372, {
        font: {
          size: 36,
          weight: "bold",
          family: "Merchant Copy"
        },
        textBaseline: "top",
        fillStyle: "#3d3c3a",
      });

      writeText(`MOB.976${mobileNo}`, 32, 402, {
        font: {
          size: 36,
          weight: "bold",
          family: "Merchant Copy"
        },
        textBaseline: "top",
        fillStyle: "#3d3c3a",
      });

      writeText(`Bill No  :${billNo}-ORGNL`, 32, 480, {
        font: {
          size: 36,
          weight: "bold",
          family: "Merchant Copy"
        },
        textBaseline: "top",
        fillStyle: "#3d3c3a",
      });
      
      writeText(`Trns.ID  :0000000000${txnId}`, 32, 510, {
        font: {
          size: 36,
          weight: "bold",
          family: "Merchant Copy"
        },
        textBaseline: "top",
        fillStyle: "#3d3c3a",
      });

      writeText(`Atnd.ID  :`, 32, 540, {
        font: {
          size: 36,
          weight: "bold",
          family: "Merchant Copy"
        },
        textBaseline: "top",
        fillStyle: "#3d3c3a",
      });

      writeText(`Vehi.No  :NotEntered`, 32, 570, {
        font: {
          size: 36,
          weight: "bold",
          family: "Merchant Copy"
        },
        textBaseline: "top",
        fillStyle: "#3d3c3a",
      });
      
      writeText(`Date     :${format(date, "dd/MM/yy")}`, 32, 600, {
        font: {
          size: 36,
          weight: "bold",
          family: "Merchant Copy"
        },
        textBaseline: "top",
        fillStyle: "#3d3c3a",
      });

      writeText(`Time     :${time}`, 32, 630, {
        font: {
          size: 36,
          weight: "bold",
          family: "Merchant Copy"
        },
        textBaseline: "top",
        fillStyle: "#3d3c3a",
      });
      
      writeText(`FP. ID   :2`, 32, 660, {
        font: {
          size: 36,
          weight: "bold",
          family: "Merchant Copy"
        },
        textBaseline: "top",
        fillStyle: "#3d3c3a",
      });

      writeText(`Nozl No  :3`, 32, 690, {
        font: {
          size: 36,
          weight: "bold",
          family: "Merchant Copy"
        },
        textBaseline: "top",
        fillStyle: "#3d3c3a",
      });

      writeText(`Fuel     :`, 32, 720, {
        font: {
          size: 36,
          weight: "bold",
          family: "Merchant Copy"
        },
        textBaseline: "top",
        fillStyle: "#3d3c3a",
      });

      writeText(`Dencity  :8237kg/m3`, 32, 750, {
        font: {
          size: 36,
          weight: "bold",
          family: "Merchant Copy"
        },
        textBaseline: "top",
        fillStyle: "#3d3c3a",
      });

      writeText(`Preset   :Rs. ${price}`, 32, 780, {
        font: {
          size: 36,
          weight: "bold",
          family: "Merchant Copy"
        },
        textBaseline: "top",
        fillStyle: "#3d3c3a",
      });

      writeText(`Rate     :Rs. ${rate}`, 32, 810, {
        font: {
          size: 36,
          weight: "bold",
          family: "Merchant Copy"
        },
        textBaseline: "top",
        fillStyle: "#3d3c3a",
      });

      writeText(`Sale     :Rs. ${price}`, 32, 840, {
        font: {
          size: 36,
          weight: "bold",
          family: "Merchant Copy"
        },
        textBaseline: "top",
        fillStyle: "#3d3c3a",
      });

      writeText(`Volume   :${volume}L`, 32, 870, {
        font: {
          size: 36,
          weight: "bold",
          family: "Merchant Copy"
        },
        textBaseline: "top",
        fillStyle: "#3d3c3a",
      });

      downloadBill();
    });
  }

  return (
    <AppLayout>
      <section>
        <div className="container py-4">
          <h4>Fuel Bill</h4>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
              <div className="col-12 col-md-6">
                <input
                  placeholder="Pump Name"
                  className="form-control"
                  type="text"
                  {...register("pumpName", { required: true })}
                />
                {errors.pumpName && <div className="text-danger small">This field is required</div>}
              </div>
              <div className="col-12 col-md-6">
                <input
                  placeholder="City"
                  className="form-control"
                  type="text"
                  {...register("city", { required: true })}
                />
                {errors.city && <div className="text-danger small">This field is required</div>}
              </div>
              <div className="col-12 col-md-6">
                <input
                  placeholder="Date"
                  className="form-control"
                  type="datetime-local"
                  {...register("date", { required: true })}
                />
                {errors.date && <div className="text-danger small">This field is required</div>}
              </div>
              <div className="col-12 col-md-6">
                <input
                  placeholder="Rate"
                  className="form-control"
                  type="number"
                  step="0.01"
                  min="0"
                  {...register("rate", { required: true })}
                />
                {errors.rate && <div className="text-danger small">This field is required</div>}
              </div>
              <div className="col-12 col-md-6">
                <input
                  placeholder="Total Price"
                  className="form-control"
                  type="number"
                  step="0.01"
                  min="0"
                  {...register("price", { required: true })}
                />
                {errors.price && <div className="text-danger small">This field is required</div>}
              </div>
              <div className="col-12 mt-3">
                <button type="submit" className="btn btn-primary">
                  Create Bill
                </button>
              </div>
            </div>
          </form>
        </div>
        <h1 style={{fontFamily: "Merchant Copy", opacity: "0"}}>Hiii</h1>
        <canvas style={{display: "none"}} ref={canvasRef} height={1035} width={454}/>
      </section>
    </AppLayout>
  );
};

export default FuelBillForm;
