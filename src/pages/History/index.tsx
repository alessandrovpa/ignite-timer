import { formatDistanceToNow } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { useContext } from 'react';
import { TasksContext } from '../../contexts/TaskContext';
import { HistoryContainer, HistoryList, Status } from './styles';

export function History(){
	const { tasks } = useContext(TasksContext);
	return (
		<HistoryContainer>
			<h1>Meu histórico</h1>

			<HistoryList>
				<table>
					<thead>
						<tr>
							<th>Tarefa</th>
							<th>Duração</th>
							<th>Início</th>
							<th>Status</th>
						</tr>
					</thead>
					<tbody>
						{tasks.map(task => {
							return (
								<tr key={task.id}>
									<td>{task.title}</td>
									<td>{task.time} minutos</td>
									<td>{formatDistanceToNow(new Date(task.startDate), {
										addSuffix: true,
										locale: ptBR
									})}</td>
									<td>
										{task.finishedDate && <Status statusColor='green'>Concluido</Status>}
										{task.interruptedDate && <Status statusColor='red'>Interrompido</Status>}
										{!task.finishedDate && !task.interruptedDate && (
											<Status statusColor='yellow'>Em andamento</Status>)
										}
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</HistoryList>
		</HistoryContainer>
	);
}
