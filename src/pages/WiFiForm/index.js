import { useForm } from "react-hook-form";

import AppLayout from "../../components/AppLayout";

const WiFiForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = data => {
    const qs = new URLSearchParams(data).toString();
    window.open(`./wifi-invoice?${qs}`, "_blank");
  }

  return (
    <AppLayout>
      <section>
        <div className="container py-4">
          <h4>WiFi Invoice</h4>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
              <div className="col-12 col-md-6">
                <input
                  placeholder="Name"
                  className="form-control"
                  type="text"
                  {...register("name", { required: true })}
                />
                {errors.name && <div className="text-danger small">This field is required</div>}
              </div>
              <div className="col-12 col-md-6">
                <input
                  placeholder="Address 1"
                  className="form-control"
                  type="text"
                  {...register("address1", { required: true })}
                />
                {errors.address1 && <div className="text-danger small">This field is required</div>}
              </div>
              <div className="col-12 col-md-6">
                <input
                  placeholder="Address 2"
                  className="form-control"
                  type="text"
                  {...register("address2", { required: true })}
                />
                {errors.address2 && <div className="text-danger small">This field is required</div>}
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
                  placeholder="Username"
                  className="form-control"
                  type="text"
                  {...register("username", { required: true })}
                />
                {errors.username && <div className="text-danger small">This field is required</div>}
              </div>
              <div className="col-12 col-md-6">
                <input
                  placeholder="Item Price"
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
                  Create Receipt
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>
    </AppLayout>
  );
};

export default WiFiForm;
