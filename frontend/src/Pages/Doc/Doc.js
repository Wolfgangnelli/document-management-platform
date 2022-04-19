import React, { useEffect, createContext, useState } from "react";
import { Row, Col } from "react-bootstrap";
import Sidebar from "../../components/Sidebar/Sidebar";
import DocRoutes from "../../routes/docRoutes";
import "./_doc.scss";
import { useParams } from "react-router-dom";
import { useGetDocumentQuery } from "../../hooks/graphql/queries/useGetDocumentQuery/index";
import Loader from "../../components/Loader/index";
import Message from "../../components/Message/index";

export const DocumentContext = createContext();

const Doc = () => {
  const [data, setData] = useState(null);

  let { id } = useParams();

  const {
    loading,
    error,
    data: dataDocument,
  } = useGetDocumentQuery({
    variables: {
      id,
    },
  });

  useEffect(() => {
    if (dataDocument) {
      setData(dataDocument?.document);
    }
  }, [dataDocument, setData]);

  return (
    <div>
      {loading && <Loader />}
      {error && <Message variant="danger">{error?.message}</Message>}
      {data && (
        <DocumentContext.Provider value={data}>
          <Row>
            <Col lg={2} className="border-sidenav">
              <Sidebar />
            </Col>
            <Col lg={10}>
              <DocRoutes />
            </Col>
          </Row>
        </DocumentContext.Provider>
      )}
    </div>
  );
};

export default Doc;
