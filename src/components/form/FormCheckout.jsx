import React from "react";
import { InputField } from "..";

function FormCheckout({
  register,
  errors,
  isDisabled,
  defaultValue,
}) {
  return (
    <>
      <div className="bg-primary p-8 rounded-xl">
        <div className="w-full justify-center mx-auto  font-helvetica ">
          <h1 className="text-xs font-bold text-center md:text-left mb-10 ">
            DIRECCION DE ENVIO (* OBLIGATORIA)
          </h1>
        </div>

        <div className="w-full justify-center mx-auto  rounded-xl gap-4">
          <div className="flex flex-wrap gap-7 flex-row ">
            <div className="md:w-[48.7%] w-full">
              <InputField
                disabled={isDisabled}
                label="Nombre"
                defaultValue={defaultValue.firstName}
                name="firstName"
                register={register}
                errors={errors}
                placeholder="Nombre *"
                required
              />
            </div>
            <div className="md:w-[48.7%] w-full ">
              <InputField
                label="Apellido"
                disabled={isDisabled}
                name="lastName"
                defaultValue={defaultValue.lastName}
                register={register}
                errors={errors}
                placeholder="Apellido *"
                required
              />
            </div>
          </div>
          <br />
          <InputField
            label="Dirección *"
            disabled={isDisabled}
            defaultValue={defaultValue.shippingAddress1}
            name="shippingAddress1"
            register={register}
            errors={errors}
            placeholder="Dirección *"
            required
          />
          <br />
          <div className="flex flex-wrap gap-7 ">
            <div className="w-full">
              <InputField
                disabled={isDisabled}
                defaultValue={defaultValue.floor}
                label="Piso/ Dpto / Lote (Opcional)"
                name="floor"
                register={register}
                errors={errors}
                placeholder="Piso/ Dpto / Lote (Opcional)"
              />
            </div>
          </div>
          <br />
          <div className="flex flex-wrap gap-7">
            <div className="md:w-[48.7%] w-full">
              <InputField
                disabled={isDisabled}
                label="Código postal *"
                name="zip"
                defaultValue={defaultValue.zip}
                register={register}
                errors={errors}
                placeholder="Código postal *"
                required
              />
            </div>
            <div className="md:w-[48.7%] w-full ">
              <InputField
                label="Localidad *"
                disabled={isDisabled}
                defaultValue={defaultValue.city}
                name="city"
                register={register}
                errors={errors}
                placeholder="Localidad *"
                required
              />
            </div>
          </div>
          <br />
          <InputField
            label="Email *"
            name="email"
            disabled={isDisabled}
            defaultValue={defaultValue.email}
            register={register}
            errors={errors}
            placeholder="Email *"
            type="email"
            required
          />
          <br />
          <InputField
            label="País *"
            disabled={isDisabled}
            name="country"
            defaultValue={defaultValue.country}
            register={register}
            errors={errors}
            placeholder="País *"
            required
          />
          <br />
          <InputField
            label="Provincia *"
            name="state"
            register={register}
            defaultValue={defaultValue.state}
            errors={errors}
            disabled={isDisabled}
            placeholder="Provincia *"
            required
          />
          <br />
          <InputField
            disabled={isDisabled}
            label="Número de teléfono *"
            name="phoneNumber"
            defaultValue={defaultValue.phoneNumber}
            register={register}
            errors={errors}
            placeholder="Número de teléfono *"
            required
          />
          <br />
        </div>
      </div>
      <br className="mb-10" />
      <div className="w-full justify-center mx-auto gap-4 bg-primary p-8 rounded-xl">
        <InputField
          disabled={isDisabled}
          label="Comentarios (Opcional)"
          name="commentaries"
          defaultValue={defaultValue.commentaries}
          register={register}
          errors={errors}
          placeholder="Comentarios (Opcional)"
        />
        <br />
        <span>
          Ingrese el número de su DNI (para la factura)
          <InputField
            label="DNI"
            required
            disabled={isDisabled}
            defaultValue={defaultValue.userIdCard}
            name="userIdCard"
            register={register}
            errors={errors}
            placeholder="DNI"
          />
        </span>
      </div>
      <br className="mb-10" />
      <button type="submit" className="w-full">
        Confirmar
      </button>
    </>
  );
}

export default FormCheckout;
