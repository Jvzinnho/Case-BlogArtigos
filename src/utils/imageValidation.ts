
export function validateImage(file: File): { isValid: boolean; error?: string } {

  if (!file.type.startsWith('image/')) {
    return { isValid: false, error: 'Apenas imagens são permitidas' };
  }
  

  if (file.size > 5 * 1024 * 1024) {
    return { isValid: false, error: 'Arquivo muito grande. Máximo 5MB' };
  }
  

  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
  if (!allowedTypes.includes(file.type)) {
    return { isValid: false, error: 'Formato não suportado. Use: jpg, png, gif, webp' };
  }
  
  return { isValid: true };
}


export function createImagePreview(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        resolve(e.target.result as string);
      } else {
        reject(new Error('Erro ao ler arquivo'));
      }
    };
    reader.onerror = () => reject(new Error('Erro ao ler arquivo'));
    reader.readAsDataURL(file);
  });
}


export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}


