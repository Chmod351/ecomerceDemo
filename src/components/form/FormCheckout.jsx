import React from "react";
import InputField from "./Input";
import styled from 'styled-components';
import {mobile, pc} from "../../responsive";
import Button from "../ui/Button";

const Container = styled.form`
  min-height: 100vh;
  max-height: auto;
  background-color: ${({ theme }) => theme.bgLighter};
  color: ${({ theme }) => theme.text};
  ${mobile({ maxWidth: '100vw', padding: '0' })}
  ${pc({ maxWidth: '100vw', padding: '0' })}
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: 'column', overflow: 'hidden' })}
`;

const Aside=styled.aside`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: 'column', justifyContent: 'center' })}
  width: 73%;
  ${pc({ padding: '0.2rem 0rem' })}
`

const Section=styled.section`
  flex: 1;
  gap:2rem;
  display: flex;
  flex-direction: column;
background-color: ${({ theme }) => theme.bg};
padding:1rem;
border-radius: 1rem;
  ${mobile({ flexDirection: 'column' })}
`

function FormCheckout({children}) {
  return (
    <Container>
    
      <Wrapper>
      <Aside>
      <Section className="bg-primary p-8 rounded-xl">

              <InputField
                label="Nombre"
                name="firstName"
                // errors={errors}
                placeholder="Nombre *"
                required
              />
        
              <InputField
                label="Apellido"
                name="lastName"
                // errors={errors}
                placeholder="Apellido *"
                required
              />
         
          <InputField
            label="Dirección *"
            name="shippingAddress1"
            // errors={errors}
            placeholder="Dirección *"
            required
          />
        
              <InputField
                label="Piso/ Dpto / Lote (Opcional)"
                name="floor"
                // errors={errors}
                placeholder="Piso/ Dpto / Lote (Opcional)"
              />
     
              <InputField
                label="Código postal *"
                name="zip"
                // errors={errors}
                placeholder="Código postal *"
                required
              />
           
              <InputField
                label="Localidad *"
                name="city"
                // errors={errors}
                placeholder="Localidad *"
                required
              />
      
            
            </Section>
            <Section>
          <InputField
            label="Email *"
            name="email"
            // errors={errors}
            placeholder="Email *"
            type="email"
            required
          />
   
          <InputField
            label="País *"
            name="country"
            // errors={errors}
            placeholder="Provincia *"
            required
          />
          <InputField
            label="Número de teléfono *"
            name="phoneNumber"
            // errors={errors}
            placeholder="Número de teléfono *"
            required
          />
        <InputField
          label="Comentarios (Opcional)"
          name="commentaries"
          // errors={errors}
          placeholder="Comentarios (Opcional)"
        />
        <span>
          Ingrese el número de su DNI (para la factura)
          <InputField
            label="DNI"
            required
            name="userIdCard"
            // errors={errors}
            placeholder="DNI"
          />
        </span>
        </Section>
       
      </Aside>
      <>
        {children}
      </>
      </Wrapper>
  <Button type="submit" text="Confirmar" />
        
    </Container>
  );
}

export default FormCheckout;
