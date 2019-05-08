import React, { Component } from "react";
import moment from "moment";
import api from "../../services/api";
import myStorage from "../../services/mystorage";

import logo from "../../assets/logo.png";

import { Container, Form } from "./styles";
import CompareList from "../../components/CompareList";

export default class Main extends Component {
	state = {
		loading: false,
		repositoryInput: "",
		repositories: [],
		repositoryError: false
	};

	async componentDidMount() {
		if (myStorage.get("repositories", [])) {
			this.setState({
				repositories: await myStorage.get("repositories")
			});
		}
	}

	handleAddRepository = async e => {
		e.preventDefault();

		this.setState({ loading: true });

		try {
			const { data: repository } = await api.get(
				`repos/${this.state.repositoryInput}`
			);

			if (this.state.repositories.some(el => el.id === repository.id)) {
				this.setState({ repositoryInput: "" });
				throw new Error("This repo is already listed");
			}

			repository.lastCommit = moment(repository.pushed_at).fromNow();

			this.setState({
				repositoryInput: "",
				repositories: [...this.state.repositories, repository],
				repositoryError: false
			});

			await myStorage.set("repositories", this.state.repositories);
		} catch (error) {
			console.error(error);
			this.setState({ repositoryError: true });
		} finally {
			this.setState({ loading: false });
		}
	};

	handleRemoveRepository = async id => {
		const { repositories } = this.state;
		const newRepositoriesList = repositories.filter(repo => repo.id !== id);
		this.setState({ repositories: newRepositoriesList });
		await myStorage.set("repositories", newRepositoriesList);
	};

	handleRefreshRepository = async info => {
		const { repositories } = this.state;
		try {
			const { data: repository } = await api.get(`repos/${info}`);
			const newRepositoriesList = repositories.map(repo => {
				if (repo.id === repository.id) {
					repository.lastCommit = moment(repository.pushed_at).fromNow();
					return repository;
				}
				return repo;
			});

			this.setState({ repositories: newRepositoriesList });
			await myStorage.set("repositories", newRepositoriesList);
		} catch (error) {
			this.setState({ repositoryError: true });
		}
	};

	render() {
		return (
			<Container>
				<img src={logo} alt="Github Compare" />

				<Form
					withError={this.state.repositoryError}
					onSubmit={this.handleAddRepository}
				>
					<input
						type="text"
						placeholder="usuário/repositório"
						value={this.state.repositoryInput}
						onChange={e => this.setState({ repositoryInput: e.target.value })}
					/>
					<button type="submit">
						{this.state.loading ? (
							<i className="fa fa-spinner fa-pulse" />
						) : (
							"Ok"
						)}
					</button>
				</Form>

				<CompareList
					repositories={this.state.repositories}
					removeRepository={this.handleRemoveRepository}
					refreshRepository={this.handleRefreshRepository}
				/>
			</Container>
		);
	}
}
