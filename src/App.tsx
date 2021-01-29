import React from 'react';
import { Formik, FormikHelpers, Form, Field, useFormikContext, FormikContextType } from 'formik';
import axios from 'axios';

interface IForm {
  vote: string;
  voter: string;
};

const Emmiter = () => {
  const formik: FormikContextType<IForm> = useFormikContext();
  return (
    <>
      <br/>
      <div>({formik.getFieldMeta('voter').value} {formik.isSubmitting ? '- Computado!' : '- Vote com segurança!'})</div>
    </>
  );
};

const App = () => {
  const onHandler = async (values: IForm, formikHelpers: FormikHelpers<IForm>) => {
    let res = await axios.post('http://efb76ef3ec82.ngrok.io', values);
    if (res.data.message.vote) {
      formikHelpers.setSubmitting(true);
    }
  };
 
  return (
    <Formik
      initialValues={{ vote: '', voter: '' }}
      onSubmit={onHandler}
    >
      <Form>
        <div>
          <div>
            <label>Eleitor</label>
            <br/>
            <Field name="voter" placeholder="Eleitor"  />
            <br/><br/>
            <label>Voto</label>
            <br/>
            <Field name="vote" placeholder="Voto" />
            <br /><br />
            <button type="submit">Submit</button>
          </div>
          <Emmiter />
        </div>
      </Form>
    </Formik>
  )
};

export default App;
