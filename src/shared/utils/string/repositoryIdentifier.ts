export function createRepositoryId(ownerName: string, repositoryName: string): string {
    return `${ownerName}/${repositoryName}`;
}