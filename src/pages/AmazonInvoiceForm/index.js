import { useForm } from "react-hook-form";

import AppLayout from "../../components/AppLayout";

const AmazonInvoiceForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = data => {
    const qs = new URLSearchParams(data).toString();
    window.open(`./amazon-invoice?${qs}`, "_blank");
  }

  return (
    <AppLayout>
      <section>
        <div className="container py-4">
          <h4>Amazon Invoice</h4>
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
                  placeholder="Address"
                  className="form-control"
                  type="text"
                  {...register("address", { required: true })}
                />
                {errors.address && <div className="text-danger small">This field is required</div>}
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
                  placeholder="State"
                  className="form-control"
                  type="text"
                  {...register("state", { required: true })}
                />
                {errors.state && <div className="text-danger small">This field is required</div>}
              </div>
              <div className="col-12 col-md-6">
                <input
                  placeholder="Pincode"
                  className="form-control"
                  type="number"
                  min="0"
                  {...register("pincode", { required: true })}
                />
                {errors.pincode && <div className="text-danger small">This field is required</div>}
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
                  placeholder="Item Name"
                  className="form-control"
                  type="text"
                  {...register("itemName", { required: true })}
                />
                {errors.itemName && <div className="text-danger small">This field is required</div>}
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
              <div className="col-12 col-md-6">
                <input
                  placeholder="GST Percentage"
                  className="form-control"
                  type="number"
                  step="0.01"
                  min="0"
                  {...register("gst", { required: true })}
                />
                {errors.gst && <div className="text-danger small">This field is required</div>}
              </div>
              <div className="col-12 col-md-6">
                <input
                  placeholder="HSN"
                  className="form-control"
                  type="text"
                  {...register("hsn", { required: false })}
                />
                {errors.hsn && <div className="text-danger small">This field is required</div>}
              </div>
              <div className="col-12 mt-3">
                <button type="submit" className="btn btn-primary">
                  Create Invoice
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>
    </AppLayout>
  );
};

export default AmazonInvoiceForm;
