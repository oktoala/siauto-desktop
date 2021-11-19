/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/require-default-props */
/* eslint-disable react/no-unused-prop-types */
/* eslint-disable react/destructuring-assignment */
import { MemoryRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';

import { Button, Form, Alert, OverlayTrigger, Tooltip } from 'react-bootstrap';
import React, { useState } from 'react';
import { FormCheckType } from 'react-bootstrap/esm/FormCheck';
// import { ReactComponent as QuestionIcon } from './icons/question-circle.svg';

interface Props {
  // eslint-disable-next-line react/require-default-props
  children?: React.ReactNode;
  type?: FormCheckType | undefined;
  label?: string;
  required?: boolean;
  hidden?: string;
  href?: string;
  placeholder?: string;
  onClick?: React.MouseEventHandler<HTMLInputElement> | undefined;
}

interface DataColleger {
  nim: string;
  password: string;
  semId: string | undefined;
  nilai: (string | undefined)[];
  cobaDulu: boolean;
}

const dataColleger: DataColleger = {
  nim: '',
  password: '',
  nilai: [],
  semId: '',
  cobaDulu: false,
};
/* Form Input */
const FormInput = (props: Props) => {
  return (
    <Form.Group className="mb-3" controlId={`basicForm${props.children}`}>
      <Form.Label>{props.children}</Form.Label>
      <Form.Control
        name="password"
        required
        type={props.hidden}
        placeholder={props.placeholder}
      />
    </Form.Group>
  );
};

/* Kuesioner Checkboxes and RadioButton */
const FormCheckButton = (props: Props) => {
  return (
    <Form.Check
      onClick={props.onClick}
      required={props.required}
      inline
      label={props.label}
      name="group1"
      type={props.type}
      id={`inline-${props.type}-${props.label}`}
    />
  );
};

const TipsText = (props: Props) => {
  return (
    <OverlayTrigger
      placement="right"
      overlay={<Tooltip>{props.children}</Tooltip>}
    >
      <span>
        hah
        {/* <QuestionIcon height="15" /> */}
      </span>
    </OverlayTrigger>
  );
};

const MainSection = () => {
  const [checkRequired, setCheckRequired] = useState(true);
  const [semester, setSemester] = useState('');
  const [response, setResponse] = useState({
    response: 'ga',
    variantAlert: 'secondary',
  });
  const [showAlert, setShowAlert] = useState(false);
  const [loading, setLoading] = useState(false);
  // eslint-disable-next-line @typescript-eslint/naming-convention
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  // eslint-disable-next-line @typescript-eslint/naming-convention

  function currYears() {
    const today = new Date();
    const monthGanjil = ['8', '9', '10', '11', '12'];
    const january = '1';
    const monthGenap = ['2', '3', '4', '5', '6', '7'];

    // Get year
    const year = today.getFullYear();

    // Get month
    const month = (today.getMonth() + 1).toString();
    let currYear = year;

    if (month === january) {
      currYear = year - 1;
    } else if (monthGanjil.includes(month)) {
      currYear = year;
    } else if (monthGenap.includes(month)) {
      currYear = year - 1;
    }

    return currYear;
  }

  const tahunAjar = `${currYears()}/${currYears() + 1}`;

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();

    if (form.checkValidity() !== false) {
      setResponse({ response: 'Tunggu Sebentar', variantAlert: 'secondary' });
      setShowAlert(true);
      setLoading(true);
      dataColleger.nim = (
        document.querySelector('#basicFormNIM') as HTMLInputElement
      ).value;
      dataColleger.password = (
        document.querySelector('#basicFormPassword') as HTMLInputElement
      ).value;
      setLoading(false);
      // setResponse({ response: data.response, variantAlert: data.variantAlert });
    }
  }

  function onClickCheckBtn(label: string) {
    /* Detect if the label found in the array */
    const index = dataColleger.nilai.indexOf(label);
    if (index !== -1) {
      dataColleger.nilai.splice(index, 1);
    } else {
      dataColleger.nilai.push(label);
    }

    dataColleger.nilai.sort();

    if (dataColleger.nilai.length !== 0) {
      setCheckRequired(false);
      return;
    }
    setCheckRequired(true);
  }

  return (
    <section className="main-section">
      <h3>{`Semester ${tahunAjar} ${semester}`}</h3>
      <Form className="mb-4" onSubmit={handleSubmit}>
        <FormInput placeholder="Masukkan NIM" hidden="text">
          NIM
        </FormInput>
        <FormInput placeholder="Masukkan Password SIA/Mols" hidden="password">
          Password
        </FormInput>
        <Form.Label>
          Nilai Kuesioner{' '}
          <TipsText>
            Nilai-nilai yang dipilih akan dirandom saat pengisian kuesioner
          </TipsText>{' '}
        </Form.Label>
        <Form.Group className="mb-3" controlId="basicFormCheckbox">
          {['1', '2', '3', '4', '5'].map((label) => (
            <FormCheckButton
              onClick={() => onClickCheckBtn(label)}
              required={checkRequired}
              type="checkbox"
              label={label}
            />
          ))}
        </Form.Group>
        <Form.Label>Semester</Form.Label>
        <Form.Group className="mb-3" controlId="basicFormRadio">
          {[
            {
              nama: 'Ganjil',
              id: '1',
            },
            {
              nama: 'Genap',
              id: '2',
            },
          ].map((label) => (
            <FormCheckButton
              onClick={() => {
                dataColleger.semId = currYears() + label.id;
                setSemester(label.nama);
              }}
              required
              type="radio"
              label={label.nama}
            />
          ))}
        </Form.Group>
        <Form.Group className="mb-3" controlId="basicFormTrust">
          <FormCheckButton
            onClick={() => {
              dataColleger.cobaDulu = !dataColleger.cobaDulu;
            }}
            type="checkbox"
            label="Isi satu dulu"
          />
        </Form.Group>
        <Button variant="primary" disabled={loading} type="submit">
          Mulai
        </Button>
      </Form>
      <Alert
        hidden={!showAlert}
        onClose={() => setShowAlert(false)}
        dismissible={!loading}
        variant={response.variantAlert}
        className="mt-4"
      >
        {response.response}
      </Alert>
    </section>
  );
};

// ! COMPONENT

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={MainSection} />
      </Switch>
    </Router>
  );
}
