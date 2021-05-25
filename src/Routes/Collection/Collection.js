import React from "react";
import { collectionApi } from "../../api";
import CollectionPresenter from "./CollectionPresenter";

class Collections extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      result: null,
      error: null,
      loading: true,
    };
  }

  async componentDidMount() {
    const { collectionId, id } = this.props;

    try {
      let {
        data: { parts: result },
      } = await collectionApi.collectionDetail(collectionId);
      result = result.filter((item) => item.id !== id);
      this.setState({ result });
    } catch {
      this.setState({ error: "Can't find anything." });
    } finally {
      this.setState({ loading: false, id });
    }
  }
  render() {
    const { result, error, loading, id } = this.state;
    return (
      <CollectionPresenter
        result={result}
        error={error}
        loading={loading}
        id={id}
      />
    );
  }
}

export default Collections;
